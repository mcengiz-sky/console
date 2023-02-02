/**
 * Copyright 2022 Redpanda Data, Inc.
 *
 * Use of this software is governed by the Business Source License
 * included in the file https://github.com/redpanda-data/redpanda/blob/dev/licenses/bsl.md
 *
 * As of the Change Date specified in that file, in accordance with
 * the Business Source License, use of this software will be governed
 * by the Apache License, Version 2.0
 */

import {Select, Tooltip} from 'antd';
import {observer} from 'mobx-react';
import {CompressionType, CustomMessageType, EncodingType} from '../../../../state/restInterfaces';
import {Label} from '../../../../utils/tsxUtils';
import {uiState} from '../../../../state/uiState';


interface CustomMessage {
    value: CustomMessageType;
    label: string;
    tooltip: string;
    body?: string;
}


const customMessageOptions: CustomMessage[] = [
    {value: 'none', label: 'Choose message', tooltip: 'Choose message'},
    {value: 'ukTerritory', label: 'UK Territory', tooltip: 'UK Territory'},
    {value: 'itTerritory', label: 'IT Territory', tooltip: 'IT Territory'},
    {value: 'deTerritory', label: 'DE Territory', tooltip: 'DE Territory'},
];

interface State {
    topics: string[];
    partition: number;
    compressionType: CompressionType;

    encodingType: EncodingType;

    key: string;
    // keyEncoding?: EncodingType;

    value: string;
    // valueEncoding?: EncodingType;

    headers: { key: string; value: string; }[];

    customMessageType: CustomMessageType
}


export interface Properties {
    state: State;
}


const CustomMessageSelect = observer((p: Properties): JSX.Element => {

    return <Label text="Custom Messages">
        <Select<CustomMessageType> disabled={p.state.encodingType != 'customMessage'} value={p.state.customMessageType}
                                   onChange={(v) => {
                                       p.state.customMessageType = v;
                                       if (p.state.customMessageType == 'none') {
                                           p.state.value = '';
                                       }
                                       else if (p.state.customMessageType == 'ukTerritory') {
                                           p.state.value = '{"id": "1111", "name": "UK territory"}';
                                       } else if (p.state.customMessageType == 'itTerritory') {
                                           p.state.value = '{"id": "2222", "name": "IT territory"}';
                                       } else if (p.state.customMessageType == 'deTerritory') {
                                           p.state.value = '{"id": "3333", "name": "DE territory"}';
                                       }

                                       if (p.state.encodingType != 'customMessage') {
                                           p.state.value = '';
                                       }
                                       uiState.messageValue = p.state.value
                                   }

                                   }
                                   style={{minWidth: '150px'}} virtual={false}>
            {customMessageOptions.map(x =>
                <Select.Option key={x.value} value={x.value}>
                    <Tooltip overlay={x.tooltip} mouseEnterDelay={0} mouseLeaveDelay={0} placement="right">
                        <div>{x.label}</div>
                    </Tooltip>
                </Select.Option>)}
        </Select>
    </Label>;
})
export default CustomMessageSelect;
