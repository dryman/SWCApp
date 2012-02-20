package SWCApp::DB;
use base 'DBIx::Class::Schema';

our $VERSION = 1;

SWCApp::DB->load_namespaces;

1;

=head1 NAME

SWCApp::DB Perl object <-> relational database mapper.

=head2 SYNOPSIS

    use SWCApp::DB;
    my $schema = SWCApp::DB->connect($dbi_dsn, $user, $pass);

=cut

__END__
