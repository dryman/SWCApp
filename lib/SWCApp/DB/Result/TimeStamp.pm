package SWCApp::DB::Result::TimeStamp;
use base 'DBIx::Class::Core';

__PACKAGE__->table('time_stamp');
__PACKAGE__->load_components(qw|InflateColumn::DateTime|);
__PACKAGE__->add_columns(
  id =>       +{qw|data_type integer  is_nullable 0  is_auto_increment  1|},
  time =>     +{qw|data_type datetime is_nullable 0 floating_tz_ok 1|},
  post_option => +{qw|data_type integer  is_nullable 0 default_value 0|},
  article_id =>  +{qw|data_type integer  is_nullable 0  is_foreign_key 1|},
  user_id =>     +{qw|data_type integer  is_nullable 0  is_foreign_key 1|},
);
__PACKAGE__->set_primary_key('id');
__PACKAGE__->belongs_to(qw|user SWCApp::DB::Result::User user_id|);
__PACKAGE__->belongs_to(qw|article SWCApp::DB::Result::Article article_id|);

1;
