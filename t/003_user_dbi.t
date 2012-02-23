use Test::More tests => 1;
use strict;
use warnings;
use lib 'lib';
use SWCApp::DB;

my $schema = SWCApp::DB->connect('dbi:SQLite:dbname=development.db',"","",{sqlite_unicode=>1});

my $user_rs = $schema->resultset('User');
#$user_rs->update_or_create({ptt => $string});
