package SWCApp::DB::Result::Article;
use base 'DBIx::Class::Core';

__PACKAGE__->table('article');
__PACKAGE__->add_columns(
  id =>       +{qw|data_type integer  is_nullable 0  is_auto_increment  1|},
  title =>    +{qw|data_type text     is_nullable 0|},
  content =>  +{qw|data_type text     is_nullable 1|},
  snippet =>   +{qw|data_type text     is_nullable 1|},
  url =>      +{qw|data_type text     is_nullable 1|},
  cluster =>  +{qw|data_type integer  is_nullable 0 default_value 0|},
);

__PACKAGE__->set_primary_key('id');
#__PACKAGE__->load_components(qw{Helper::ResultSet::SetOperations});


1;
