'use strict';

let editor;
window.onload = function (){
    init();

}


function init() {
    json_edit_init();
}

function json_edit_init() {
    JSONEditor.defaults.options.template = 'swig';
    JSONEditor.defaults.languages.en.button_collapse = "collapse";
    JSONEditor.defaults.languages.en.button_expand = "expand";
    JSONEditor.defaults.languages.en.button_edit_json = "edit_schema";
    JSONEditor.defaults.languages.en.button_object_properites = "add";
    JSONEditor.defaults.languages.en.button_add_properties = "add";
    JSONEditor.defaults.languages.en.error_minimum_incl = "最少长度为{{0}}";
    JSONEditor.defaults.languages.en.error_pattern = "必须满足正则表达公式{{0}}";
    JSONEditor.defaults.languages.en.error_minLength = "最少长度为{{0}}";
    JSONEditor.defaults.languages.en.error_notempty = "不能为空";
    let schema={
        "title": "demo",
        "type":"object",
        "options":{
            "disable_collapse":false,
            "disable_edit_json":false,
        },
        "format":"grid",
        "required":["properties"],
        "properties": {
            "properties": {
                "title": "properties",
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
                "required":["type","value_set_type"],
                "type":"object",
                "format":"grid",
                "properties":{
                    "type":{
                        "title":"type",
                        "type":"string",
                        "id":"type",
                        "enumSource": [{
                            "source": [
                                {
                                    "value": "string",
                                    "title": "string"
                                },
                                {
                                    "value": "integer",
                                    "title": "integer"
                                },
                                {
                                    "value": "double",
                                    "title": "double"
                                },
                                {
                                    "value": "boolean",
                                    "title": "boolean"
                                }],
                            "title": "{{item.title}}",
                            "value": "{{item.value}}"
                        }],
                    },
                    "value_set_type":{
                        "title":"value_set_type",
                        "type":"string",
                        "name":'t1',
                        "format":'relative path',
                        "enumSource": [{
                            "source": [
                                {
                                    "value": "continuous",
                                    "title": "continuous",
                                    "filter":['integer','double']
                                },
                                {
                                    "value": "discrete",
                                    "title": "discrete",
                                    "filter":['integer','string','boolean']
                                },
                                {
                                    "value": "pattern",
                                    "title": "pattern",
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
                },
            },
            "complex_col":{
                "required":["properties"],
                "type":"object",
                "format":"grid",
                "properties":{
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
                        "title": "basic_col",
                        "$ref": "#/definitions/basic_col",
                    },
                    {
                        "title": "complex_col",
                        "$ref": "#/definitions/complex_col",
                    }
                ],
            },
        },
    };

    editor = new JSONEditor(document.getElementById('json-eidtor'),
        {
            display_required_only:true,
            disable_edit_json:true,
            disable_properties:true,
            show_errors:"always",
            //iconlib:"bootstrap3",
            schema:schema
        });
}


