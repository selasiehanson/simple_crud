let CustomElement = {};

let selectTemplate = `
  <ui-select 
    ng-model="model[options.key]" 
    theme="bootstrap" 
    ng-required="{{to.required}}" 
    ng-disabled="{{to.disabled}}" 
    reset-search-input="false"> 
    <ui-select-match 
      placeholder="{{to.placeholder}}"> 
        {{$select.selected[to.labelProp || 'name']}} 
    </ui-select-match> 
    <ui-select-choices 
      group-by="to.groupBy" 
      repeat="option[to.valueProp || 'value'] as option in to.options | filter: $select.search"> 
      <div ng-bind-html="option[to.labelProp || 'name'] | highlight: $select.search"></div> 
    </ui-select-choices> 
  </ui-select>
`;

CustomElement.UISelect= {
  extends: 'select',
  name: 'ui-select',
  template: selectTemplate
};

export { CustomElement };
