import React from 'react';
import {Link} from 'react-router-dom';
import {Box} from 'theme-ui';
import {Button, Table, Title} from '../common';
import * as API from '../../api';
import logger from '../../logger';

const CompaniesTable = ({
  loading,
  companies,
}: {
  loading?: boolean;
  companies: Array<any>;
}) => {
  const data = companies.map((company) => {
    return {key: company.id, ...company};
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => {
        return value;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => {
        return value || '--';
      },
    },
    {
      title: 'Website',
      dataIndex: 'website_url',
      key: 'website_url',
      render: (value: string) => {
        return value || '--';
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (value: string, record: any) => {
        const {id: companyId} = record;

        return (
          <Link to={`/companies/${companyId}`}>
            <Button>View</Button>
          </Link>
        );
      },
    },
  ];

  return <Table loading={loading} dataSource={data} columns={columns} />;
};

type Props = {};
type State = {
  loading: boolean;
  companies: Array<any>;
};

class CompaniesPage extends React.Component<Props, State> {
  state: State = {
    loading: true,
    companies: [],
  };

  async componentDidMount() {
    try {
      const companies = await API.fetchCompanies();
      logger.info('Companies:', companies); // TODO

      this.setState({companies, loading: false});
    } catch (err) {
      logger.error('Error loading companies!', err);

      this.setState({loading: false});
    }
  }

  render() {
    const {loading, companies = []} = this.state;

    return (
      <Box p={4}>
        <Title level={3}>Companies (beta)</Title>

        <Box my={4}>
          <CompaniesTable loading={loading} companies={companies} />
        </Box>
      </Box>
    );
  }
}

export default CompaniesPage;
