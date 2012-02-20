package SWCApp::DB::Result::Session;
use base 'DBIx::Class::Core';

__PACKAGE__->table('session');
__PACKAGE__->add_columns(
  sid =>      +{qw|data_type integer  is_nullable 0  is_auto_increment  1|},
  data =>     +{qw|data_type text     is_nullable 0|},
  expires =>  +{qw|data_type integer  is_nullable 0|},
);
__PACKAGE__->add_unique_constraint(['sid']);
__PACKAGE__->set_primary_key('sid');

1;

