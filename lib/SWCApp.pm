package SWCApp;
use Dancer ':syntax';
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
