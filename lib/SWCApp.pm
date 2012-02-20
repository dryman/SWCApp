package SWCApp;
use 5.010;
use utf8;
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

post '/ajax' => sub {
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
