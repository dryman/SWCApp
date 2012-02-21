package SWCApp;
use 5.010;
use utf8;
use DateTime;
use Dancer ':syntax';
use FindBin '$Bin';
use List::Util 'shuffle';
use SWCApp::DB;
set serializer => 'JSON';

our $VERSION = '0.1';


get '/' => sub {
    template 'index';
};

get '/sample' => sub {
  template 'sample';
};
get '/snippet' => sub {
  template 'snippet';
};
post '/submit' => sub {
  my $dt = DateTime->now;
  my $file_name = $dt->ymd.'-'.$dt->hms.'-'.request->address;
  my %hash = params;
  my $user_answer = from_json param "user_answer";
  my $answer = from_json param "answer";
  my $records = from_json param "records";
  my $comment = param "comment";
  debug $comment;
  my $pttid = param "pttid";
  {
    open my $fh, ">:encoding UTF-8)", "public/json/$file_name.json";
    my $string = <<STR;
{
"pttid": "$pttid", 
"user_answer": $hash{user_answer},
"answer": $hash{answer},
"comment": "$comment",
"records": $hash{records}
}
STR
    debug $string;
    print $fh $string;
    close $fh;
  }
  {
    open my $fh, ">public/csv/$file_name.csv";
    print $fh <<CSV;
% pttid = $pttid
% user_answer = @$user_answer
% answer = @$answer
% comment = $comment
id, cluster, msec, diff, option
CSV
    print $fh "$_->{id}, $_->{cluster}, $_->{msec}, $_->{diff}, $_->{option}\n" for @$records;
    close $fh;
  }
  my $content = <<CONTENT;
 <p> 謝謝您協術我們進行這份專題製作的網路測驗，您的回饋是我們進步的動力。</p> 
 <p>我們會在數天後將400批幣（稅前）匯入至您的帳戶，再次感謝您。</p>
CONTENT

  {
    title => "感謝您的合作",
    content => $content,
  }
};

post '/ajax' => sub {
  debug param "pttid";
  my $schema = SWCApp::DB->connect('dbi:SQLite:dbname=development.db',"","",{sqlite_unicode=>1});
  my $r_rs = $schema->resultset('RandomSet');

  # choose set_id
  my $random_groups = $r_rs
    ->search({},{group_by=>'set_id'})
    ->count;
  my $set_id = int(rand($random_groups))+1;

  # get set of articles (with title, cluster, and content)
  my @randoms = $r_rs->search({set_id=>$set_id},{order_by => "ord"})->all;
  my @articles = map {{
    id => $_->article->id,
    title => $_->article->title,
    cluster => $_->article->cluster,
    content => $_->article->content,
  }} @randoms;

  # generate test snippets
  my @r_snippets = 
    shuffle 
    map {$_->article->snippet}
    $r_rs->search({set_id => $set_id})->all;
  my @n_snippets =
    shuffle
    map {$_->snippet}
    $schema->resultset('Article')->search({
      cluster => 0,
      id => { -not_in =>
        $r_rs
          ->search({set_id=>$set_id})
          ->get_column('article_id')
          ->as_query
      },
    })->all;
  my @r_nums = shuffle 0..4;
  my @selected_snippets = (@r_snippets[0..2], @n_snippets[0..1]);
  my @test_snippets = @selected_snippets[@r_nums];
  my @answers = map {$_ <= 2 ? 1: 0} @r_nums;

  {
    success => 1,
    articles => \@articles,
    snippets => \@test_snippets,
    answers => \@answers,
  }
};

true;
