package SWCApp;
use Dancer ':syntax';
set serializer => 'JSON';

our $VERSION = '0.1';

get '/' => sub {
    template 'index';
};

get '/example' => sub {
  { 
    hello => "world",
    cool => "haha",
  }
};

true;
