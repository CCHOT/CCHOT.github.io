'use strict';

let editor;
$(function () {
    init();

});


function init() {
    json_edit_init();
}

function json_edit_init() {
    JSONEditor.defaults.options.theme = 'bootstrap3';
    JSONEditor.defaults.options.template = 'swig';
    let schema={
        "title": "大T JSON Schema",
        "type":"object",
        "options":{
            "disable_collapse":true,
            "disable_edit_json":true,
        },
        "format":"grid",
        "required":["properties","op_type","id","type","required","desc","rep_user","app_version"],
        "properties": {
            "op_type":{
                "type":"string",
                'valid_format':'op_type',
                "minLength": 8,
                "maxLength": 11,
                "pattern" : "^[0-9A-Z]+$",
                "options":{
                    "grid_columns":2
                }
                },
            "rep_user":{
                "title":"责任人",
                "type":"string",
                "minLength":1,
                "options":{
                    "grid_columns":2
                },
            },
            "app_version":{
                "title":"起始APP版本",
                "type":"string",
                "minLength":1,
                "pattern":"^[0-9]{3}$",
                "options":{
                    "grid_columns":2
                },
                "description":"开始校验的APP版本,例: 800"
            },
            "id":{
                "type":"string",
                "default":"#",
                "options":{
                    "hidden":true
                }
                },
            "type":{
                "type":"string",
                "default":"object",
                "options":{
                    "hidden":true
                },
            },
            "required":{
                "type":"array",
                "options":{
                    "hidden":true
                },
            },
            "desc":{
                "type":"string",
                "title":"备注",
                "options":{
                    "grid_columns":6
                },
                "description":"请输入大T用途描述信息"
            },
            "properties": {
                "title": "列规则定义",
                "options":{
                    disable_properties:false,
                    disable_collapse:false,
                },
                additionalProperties:false,
                "type": "object",
                "required":[],
                "properties":{
                    "r2":{
                        "$ref":"#/definitions/col_schema",
                        "propertyOrder": 100001
                    },
                    "r3":{
                        "$ref":"#/definitions/col_schema",
                        "propertyOrder": 100002
                    },
                    "r4":{
                        "$ref":"#/definitions/col_schema",
                        "propertyOrder": 100003
                    },
                    "r5":{
                        "$ref":"#/definitions/col_schema",
                        "propertyOrder": 100004
                    },
                },
            },
        },
        "definitions": {
            "basic_col":{
                "required":["id","type","value_set_type","value_set","desc"],
                "type":"object",
                "format":"grid",
                "properties":{
                    "id":{
                        "type":"string",
                        "options":{
                            "hidden":true
                        }
                        },
                    "type":{
                        "title":"类型",
                        "type":"string",
                        "id":"type",
                        "enumSource": [{
                            "source": [
                                {
                                    "value": "string",
                                    "title": "字符串"
                                },
                                {
                                    "value": "integer",
                                    "title": "整型"
                                },
                                {
                                    "value": "double",
                                    "title": "double"
                                },
                                {
                                    "value": "boolean",
                                    "title": "布尔"
                                }],
                            "title": "{{item.title}}",
                            "value": "{{item.value}}"
                        }],
                    },
                    "value_set_type":{
                        "title":"取值类型",
                        "type":"string",
                        "name":'t1',
                        "format":'relative path',
                        "enumSource": [{
                            "source": [
                                {
                                    "value": "continuous",
                                    "title": "连续区间",
                                    "filter":['integer','double']
                                },
                                {
                                    "value": "discrete",
                                    "title": "离散枚举",
                                    "filter":['integer','string','boolean']
                                },
                                {
                                    "value": "pattern",
                                    "title": "正则表达式",
                                    "filter":['string']
                                }],
                            "title": "{{item.title}}",
                            "value": "{{item.value}}",
                            filter: "{% if item.filter.indexOf(watched.type)!==-1%}1{% endif %}",
                        }],
                        watch:{
                            type:"type"
                        },
                    },
                    "value_set":{
                        "title":"取值规则",
                        "type":"string",
                        "valid_format":'value_set',
                        "description":"<strong>连续区间：</strong>开闭区间字符串,如：(0,12]；<br>" +
                        '<strong>离散枚举：</strong>array字符串，如 ["体育","娱乐"]；<br>' +
                        '<strong>正则表达式：</strong>正则表达式字符串，如[0-9]+'
                    },
                    "desc":{
                        "type":"string",
                        "title":"备注",
                        "description":"请输入列含义的描述信息"
                    },
                },
            },
            "complex_col":{
                "required":["id","type","required","properties"],
                "type":"object",
                "format":"grid",
                "properties":{
                    "id":{
                        "type":"string",
                        "options":{
                            "hidden":true
                        },
                    },
                    "type":{
                        "type":"string",
                        "default":"object",
                        "options":{
                            "hidden":true
                        },
                    },
                    "required":{
                        "type":"string",
                        "watch":"",
                        "options":{
                            "hidden":true
                        },
                    },
                    "properties": {
                        "type": "object",
                        "title": "子列",
                        "options":{
                            "disable_properties":false,
                            "disable_collapse":false,
                        },
                        "patternProperties": {
                            ".*": {
                                "$ref": "#/definitions/col_schema"
                            },
                        },
                    },
                },
            },
            "col_schema":{
                "options": {
                    "keep_oneof_values": false
                },
                "oneOf": [
                    {
                        "title": "基础列",
                        "$ref": "#/definitions/basic_col",
                    },
                    {
                        "title": "组合列",
                        "$ref": "#/definitions/complex_col",
                    }
                ],
            },
        },
    };

    editor = new JSONEditor(document.getElementById('json_schema'),
        {
            display_required_only:true,
            disable_edit_json:true,
            disable_properties:true,
            show_errors:"always",
            //iconlib:"bootstrap3",
            schema:schema
        });
}


