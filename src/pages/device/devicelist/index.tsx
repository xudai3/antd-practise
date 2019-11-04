import {
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Row,
  Select,
  message,
  Radio,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem, TableListPagination, TableListParams } from './data.d';

import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

// type IStatusMapType = 'default' | 'processing' | 'success' | 'error';
// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'deviceAnddevicelist/add'
      | 'deviceAnddevicelist/fetch'
      | 'deviceAnddevicelist/remove'
      | 'deviceAnddevicelist/update'
    >
  >;
  loading: boolean;
  deviceAnddevicelist: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    deviceAnddevicelist,
    loading,
  }: {
    deviceAnddevicelist: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    deviceAnddevicelist,
    loading: loading.models.deviceAnddevicelist,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    formValues: {},
    stepFormValues: {},
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '平台',
      dataIndex: 'platform',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   filters: [
    //     {
    //       text: status[0],
    //       value: '0',
    //     },
    //     {
    //       text: status[1],
    //       value: '1',
    //     },
    //     {
    //       text: status[2],
    //       value: '2',
    //     },
    //     {
    //       text: status[3],
    //       value: '3',
    //     },
    //   ],
    //   render(val: IStatusMapType) {
    //     return <Badge status={statusMap[val]} text={status[val]} />;
    //   },
    // },
    {
      title: '上次借出时间',
      dataIndex: 'update_time',
      sorter: true,
      render: (val: string) => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'deviceAnddevicelist/fetch',
    });
  }

  // handleStandardTableChange = (
  //   pagination: Partial<TableListPagination>,
  //   filtersArg: Record<keyof TableListItem, string[]>,
  //   sorter: SorterResult<TableListItem>,
  // ) => {
  //   const { dispatch } = this.props;
  //   const { formValues } = this.state;

  //   const filters = Object.keys(filtersArg).reduce((obj, key) => {
  //     const newObj = { ...obj };
  //     newObj[key] = getValue(filtersArg[key]);
  //     return newObj;
  //   }, {});

  //   const params: Partial<TableListParams> = {
  //     currentPage: pagination.current,
  //     pageSize: pagination.pageSize,
  //     ...formValues,
  //     ...filters,
  //   };
  //   if (sorter.field) {
  //     params.sorter = `${sorter.field}_${sorter.order}`;
  //   }

  //   dispatch({
  //     type: 'deviceAnddevicelist/fetch',
  //     payload: params,
  //   });
  // };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'deviceAnddevicelist/fetch',
      payload: {},
    });
  };

  // handleMenuClick = (e: { key: string }) => {
  //   const { dispatch } = this.props;
  //   const { selectedRows } = this.state;

  //   if (!selectedRows) return;
  //   switch (e.key) {
  //     case 'remove':
  //       dispatch({
  //         type: 'deviceAnddevicelist/remove',
  //         payload: {
  //           key: selectedRows.map(row => row.key),
  //         },
  //         callback: () => {
  //           this.setState({
  //             selectedRows: [],
  //           });
  //         },
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // handleSelectRows = (rows: TableListItem[]) => {
  //   this.setState({
  //     selectedRows: rows,
  //   });
  // };

  // handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const { dispatch, form } = this.props;

  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return;

  //     const values = {
  //       ...fieldsValue,
  //       updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
  //     };

  //     this.setState({
  //       formValues: values,
  //     });

  //     dispatch({
  //       type: 'deviceAnddevicelist/fetch',
  //       payload: values,
  //     });
  //   });
  // };

  // handleModalVisible = (flag?: boolean) => {
  //   this.setState({
  //     modalVisible: !!flag,
  //   });
  // };

  // handleUpdateModalVisible = (flag?: boolean, record?: FormValueType) => {
  //   this.setState({
  //     updateModalVisible: !!flag,
  //     stepFormValues: record || {},
  //   });
  // };


  // handleUpdate = (fields: FormValueType) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'deviceAnddevicelist/update',
  //     payload: {
  //       name: fields.name,
  //       desc: fields.desc,
  //       key: fields.key,
  //     },
  //   });

  //   message.success('配置成功');
  //   this.handleUpdateModalVisible();
  // };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a">a</Radio.Button>
                  <Radio.Button value="b">b</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const {
      deviceAnddevicelist: { data },
      loading,
    } = this.props;

    // const { modalVisible, updateModalVisible } = this.state;

    // const parentMethods = {
    //   handleModalVisible: this.handleModalVisible,
    // };
    // const updateMethods = {
    //   handleUpdateModalVisible: this.handleUpdateModalVisible,
    // };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              loading={loading}
              data={data}
              columns={this.columns}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {/* {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null} */}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
