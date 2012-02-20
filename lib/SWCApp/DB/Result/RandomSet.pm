package SWCApp::DB::Result::RandomSet;
use base 'DBIx::Class::Core';

__PACKAGE__->table('random_set');
__PACKAGE__->add_columns(
  id =>       +{qw|data_type integer  is_nullable 0  is_auto_increment  1|},
  ord =>      +{qw|data_type integer  is_nullable 0|},
  set_id =>   +{qw|data_type integer  is_nullable 0 |},
  article_id => +{qw|data_type integer is_nullable 0 is_foreign_key 1|},
);
__PACKAGE__->set_primary_key('id');
__PACKAGE__->belongs_to(qw|article SWCApp::DB::Result::Article article_id|);

1;
