// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, {useState, useEffect, useMemo, useRef} from 'react';

import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';
import {Fabric, Stack} from 'office-ui-fabric-react';

import {debounce} from 'lodash';

import Loading from '../components/loading';
import MessageBox from '../components/messageBox';

import Context from './context';
import TopBar from './topBar';
import Table from './table';
import Ordering from './ordering';
import Filter from './filter';
import Pagination from './pagination';
import Paginator from './paginator';

import webportalConfig from '../../../config/webportal.config';
import userAuth from '../../user-auth/user-auth.component';

initializeIcons();

export default function UserView() {
  const [loading, setLoading] = useState({'show': false, 'text': ''});

  const showLoading = (text) => {
    setLoading({'show': true, 'text': text});
  };

  const hideLoading = () => {
    setLoading({'show': false});
  };

  const [messageBox, setMessageBox] = useState({show: false, text: ''});

  const showMessageBox = (value) => {
    setMessageBox({show: true, text: String(value)});
  };

  const alert = showMessageBox;

  const hideMessageBox = () => {
    setMessageBox({show: false, text: ''});
  };

  useEffect(() => {
    userAuth.checkToken(() => {
      if (!userAuth.checkAdmin()) {
        alert('Non-admin is not allowed to do this operation.');
      }
    });
  }, []);

  const [allUsers, setAllUsers] = useState([]);
  // const [allUsers, setAllUsers] = useState([{'username': 'Acapital', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'anbhu', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'biwang', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'brkyle', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'chisong', 'admin': 'true', 'virtualCluster': 'default,nni,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'core', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'imported1', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'imported6', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'jackzh', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'jerasley', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'jlema', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'lchao1', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao10', 'admin': 'false', 'virtualCluster': 'default,vc1,vc2', 'hasGithubPAT': false}, {'username': 'lchao11', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao2', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao3', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao4', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao5', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao6', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao7', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao8', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lchao9', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'lillzhen', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'nni_test', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'scarlett', 'admin': 'true', 'virtualCluster': 'default,nni,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'test', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'v_yufxu', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'vc1', 'admin': 'false', 'virtualCluster': 'default,vc1', 'hasGithubPAT': false}, {'username': 'vinay', 'admin': 'false', 'virtualCluster': 'default', 'hasGithubPAT': false}, {'username': 'xinz', 'admin': 'true', 'virtualCluster': 'default,vc1,vc2,vc3', 'hasGithubPAT': false}, {'username': 'zimiao', 'admin': 'false', 'virtualCluster': 'default,vc1', 'hasGithubPAT': false}]);

  const refreshAllUsers = () => {
    userAuth.checkToken((token) => {
      $.ajax({
        url: `${webportalConfig.restServerUri}/api/v1/user`,
        type: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        dataType: 'json',
        success: (data) => {
          setAllUsers(data);
        },
      });
    });
  };
  useEffect(refreshAllUsers, []);

  const [ordering, setOrdering] = useState(new Ordering());
  const [pagination, setPagination] = useState(new Pagination());

  const initialFilter = useMemo(() => {
    const filter = new Filter();
    filter.load();
    return filter;
  });
  const [filter, setFilter] = useState(initialFilter);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => filter.save(), [filter]);

  const {current: applyFilter} = useRef(debounce((allUsers, /** @type {Filter} */filter) => {
    setFilteredUsers(filter.apply(allUsers || []));
  }, 200));

  useEffect(() => {
    applyFilter(allUsers, filter);
  }, [applyFilter, allUsers, filter]);

  useEffect(() => {
    setPagination(new Pagination(pagination.itemsPerPage, 0));
  }, [filteredUsers]);

  const context = {
    allUsers,
    refreshAllUsers,
    filteredUsers,
    ordering,
    setOrdering,
    filter,
    setFilter,
    pagination,
    setPagination,
    selectedUsers,
    setSelectedUsers,
  };

  return (
    <Context.Provider value={context}>
      <Fabric style={{height: '100%'}}>
        <Stack verticalFill styles={{root: {position: 'relative'}}}>
          <Stack.Item>
            <TopBar />
          </Stack.Item>
          <Stack.Item grow styles={{root: {height: 1, overflow: 'auto', backgroundColor: 'white', paddingTop: 15}}}>
            <Table />
          </Stack.Item>
          <Stack.Item>
            <Paginator />
          </Stack.Item>
        </Stack>
      </Fabric>
      {loading.show && <Loading label={loading.text} />}
      {messageBox.show && <MessageBox text={messageBox.text} onDismiss={hideMessageBox} />}
    </Context.Provider>
  );
}
