package SWCApp::DB::Result::User;
use base 'DBIx::Class::Core';

__PACKAGE__->table('user');
__PACKAGE__->add_columns(
  id =>       +{qw|data_type integer  is_nullable 0  is_auto_increment  1|},
  ptt =>      +{qw|data_type text     is_nullable 0|},
  userAgent => +{qw|data_type text    is_nullable 1|},
  set_id =>   +{qw|data_type integer  is_nullable 1 is_foreign_key 1|},
);
__PACKAGE__->set_primary_key('id');
__PACKAGE__->add_unique_constraint(['ptt']);
#__PACKAGE__->has_many(qw|time_stamps SWCApp::DB::Result::TimeStamp user_id|);
#__PACKAGE__->has_many(
  #random_nums => 'SWCApp::DB::Result::RandomSet',
  #{'foreign.set_id','self.set_id'},
#);

1;
