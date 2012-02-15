package SWCApp;
use 5.010;
use utf8;
#use encoding 'utf8';
use Encode qw(is_utf8);
use Dancer ':syntax';
use File::Find;
use FindBin qw($Bin);
set serializer => 'JSON';

our $VERSION = '0.1';

get '/' => sub {
    template 'index';
};

get '/example' => sub {
  { 
    hello => "The title is changed",
    cool => "haha",
  }
};

true;
