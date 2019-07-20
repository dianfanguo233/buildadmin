define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    $('#ok').click(function () {
        $("#table").bootstrapTable('refresh');
    });

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'xigua/totalrank/index' + location.search,
                    add_url: 'xigua/totalrank/add',
                    edit_url: 'xigua/totalrank/edit',
                    del_url: 'xigua/totalrank/del',
                    multi_url: 'xigua/totalrank/multi',
                    table: 'xigua_total_rank',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'xigua_id', title: __('Xigua_id'), sortable:true},
                        {field: 'room_id', title: __('Room_id'), sortable:true},
                        {field: 'nickname', title: __('Nickname'), sortable:true},
                        {field: 'rank', title: __('Rank'), sortable:true},
                        {field: 'score', title: __('Score'), sortable:true},
                        {field: 'avatar_thumb', title: __('Avatar_thumb'), formatter: function (value, row, index) {
                            return '<a href="' + value + '" target="_blank"><img src="' + value + '" height="30" /></a>';
                        }},
                        {field: 'level', title: __('Level'), sortable:true},
                        {field: 'remark', title: __('Remark')},
                        {field: 'state', title: __('State'), searchList: {"1":__('State 1'),"2":__('State 2')}, formatter: Table.api.formatter.normal, sortable:true},
                        {field: 'ranktime', title: __('Ranktime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime, sortable:true},
                        // {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        // {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ],
                //普通搜索
                commonSearch: false,
                showToggle: false,
                // showColumns: false,
                pageList: [15, 50, 100, 'All'],
                pageSize: 15,
                queryParams: function(){
                    var params = {};
                    var options = $('#table').bootstrapTable('getOptions');

                    params['limit'] = options.pageSize? options.pageSize: 15;
                    params['offset'] = !isNaN(options.pageSize) && options.pageNumber? (options.pageNumber-1) * options.pageSize: 0;
                    params['search'] = options.searchText? options.searchText: '';
                    params['sort'] = options.sortName? options.sortName: 'createtime';
                    params['order'] = options.sortOrder? options.sortOrder: 'desc';
                    params['state'] = $("#state").val();
                    params['begin_time'] = $("#begin_time").val();
                    params['end_time'] = $("#end_time").val();
                    return params;
                },
                exportTypes: ['excel'],
                undefinedText: '',
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            Controller.api.bindevent();
            // 修改搜索框提示文字
            $('.search input').attr('placeholder', '西瓜ID/直播间ID/昵称');
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});