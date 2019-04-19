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

import React, {useContext, useMemo} from 'react';

import {DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {Link} from 'office-ui-fabric-react/lib/Link';
import {ColumnActionsMode, Selection} from 'office-ui-fabric-react/lib/DetailsList';
import {MessageBar, MessageBarType} from 'office-ui-fabric-react/lib/MessageBar';
import {ShimmeredDetailsList} from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import {FontClassNames} from 'office-ui-fabric-react/lib/Styling';

import Context from './context';
import Ordering from './ordering';

import {toBool, getVirtualCluster} from './utils';

export default function Table() {
  // const {allJobs, stopJob, filteredJobs, setSelectedJobs, filter, ordering, setOrdering, pagination} = useContext(Context);
  const {allUsers, ordering, setOrdering} = useContext(Context);

  // /**
  //  * @type {import('office-ui-fabric-react').Selection}
  //  */
  // const selection = useMemo(() => {
  //   return new Selection({
  //     onSelectionChanged() {
  //       setSelectedJobs(selection.getSelection());
  //     },
  //   });
  // }, []);

  /**
   * @param {React.MouseEvent<HTMLElement>} event
   * @param {import('office-ui-fabric-react').IColumn} column
   */
  function onColumnClick(event, column) {
    const {field, descending} = ordering;
    if (field === column.key) {
      if (descending) {
        setOrdering(new Ordering());
      } else {
        setOrdering(new Ordering(field, true));
      }
    } else {
      setOrdering(new Ordering(column.key));
    }
  }

  /**
   * @param {import('office-ui-fabric-react').IColumn} column
   */
  function applySortProps(column) {
    column.isSorted = ordering.field === column.key;
    column.isSortedDescending = ordering.descending;
    column.onColumnClick = onColumnClick;
    return column;
  }

  /**
   * @type {import('office-ui-fabric-react').IColumn}
   */
  const usernameColumn = applySortProps({
    key: 'username',
    minWidth: 200,
    name: 'User Name',
    fieldName: 'username',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    // isFiltered: filter.keyword !== '',
  });

  const adminColumn = applySortProps({
    key: 'admin',
    minWidth: 150,
    name: 'Admin',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    // isSorted: ordering.field === 'modified',
    // isSortedDescending: !ordering.descending,
    onRender(user) {
      return toBool(user.admin) ? 'Yes' : 'No';
    },
  });

  const virtualClusterColumn = applySortProps({
    key: 'virtualCluster',
    minWidth: 200,
    name: 'Virtual Cluster',
    className: FontClassNames.mediumPlus,
    headerClassName: FontClassNames.medium,
    isResizable: true,
    // isFiltered: filter.keyword !== '',
    onRender(user) {
      return getVirtualCluster(user);
    },
  });


  // /**
  //  * @type {import('office-ui-fabric-react').IColumn}
  //  */
  // const actionsColumn = {
  //   key: 'actions',
  //   minWidth: 100,
  //   name: 'Actions',
  //   headerClassName: FontClassNames.medium,
  //   columnActionsMode: ColumnActionsMode.disabled,
  //   onRender(job) {
  //     /**
  //      * @param {React.MouseEvent} event
  //      */
  //     function onClick(event) {
  //       event.stopPropagation();
  //       // stopJob(job);
  //     }
  //     /** @type {React.CSSProperties} */
  //     const wrapperStyle = {display: 'inline-block', verticalAlign: 'middle', width: '100%'};

  //     const statusText = getStatusText(job);
  //     const disabled = statusText !== 'Waiting' && statusText !== 'Running';
  //     return (
  //       <div style={Object.assign(wrapperStyle, zeroPaddingRowFieldStyle)} data-selection-disabled>
  //         <DefaultButton
  //           iconProps={{iconName: 'StopSolid'}}
  //           disabled={disabled}
  //           onClick={onClick}
  //         >
  //           Stop
  //         </DefaultButton>
  //       </div>
  //     );
  //   },
  // };

  const columns = [
    usernameColumn,
    adminColumn,
    virtualClusterColumn,
  ];

  // return (
  //   <ShimmeredDetailsList
  //     items={pagination.apply(ordering.apply(filteredJobs || []))}
  //     setKey="key"
  //     columns={columns}
  //     enableShimmer={allJobs === null}
  //     shimmerLines={pagination.itemsPerPage}
  //     selection={selection}
  //   />
  // );

  return (
    <ShimmeredDetailsList
      items={ordering.apply(allUsers || [])}
      setKey="key"
      columns={columns}
    />
  );
}
