import React from 'react'
import InlineConditions from './inline-conditions'
import { ConditionsModel } from './inline-condition-model'

class SelectConditions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fields: this.fieldsForPath(props.path),
      inline: !props.data.hasConditions
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.path !== prevProps.path) {
      const fields = this.fieldsForPath(this.props.path)

      this.setState({
        conditions: new ConditionsModel(),
        fields: fields,
        editView: false
      })
    }
  }

  fieldsForPath (path) {
    const { data } = this.props
    return data.inputsAccessibleAt(path)
      .map(input => ({
        label: input.title,
        name: input.propertyPath,
        type: input.type,
        values: (data.listFor(input)??{}).items
      }))
      .reduce((obj, item) => {
        obj[item.name] = item
        return obj
      }, {})
  }

  onClickDefineCondition = () => {
    this.setState({
      inline: true,
      selectedCondition: null
    })
  }

  setState (state, callback) {
    if (state.selectedCondition !== undefined) {
      this.props.conditionsChange(undefined, state.selectedCondition)
    }
    super.setState(state, callback)
  }

  onChangeConditionSelection = e => {
    const input = e.target
    this.setState({
      selectedCondition: input.value
    })
  }

  onCancelInlineCondition = () => {
    this.setState({
      inline: !this.props.data.hasConditions,
      selectedCondition: null
    })
  }

  render () {
    const { selectedCondition, inline } = this.state

    return (
      this.state.fields && Object.keys(this.state.fields).length > 0 &&
        <div className='conditions'>
          <div className='govuk-form-group' id='conditions-header-group'>
            <label className='govuk-label govuk-label--s' htmlFor='page-conditions'>Conditions (optional)</label>
          </div>
          {!inline &&
            <div id='select-condition'>
              <div className='govuk-form-group' id='cond-selection-group'>
                <label className='govuk-label' htmlFor='cond-select'>
                  Select a condition
                </label>
                <select className='govuk-select' id='cond-select' name='cond-select' value={selectedCondition??''}
                  onChange={this.onChangeConditionSelection}>
                  <option />
                  {
                    this.props.data.conditions.map((it, index) =>
                      <option key={`select-condition-${index}`} value={it.name}>{it.displayName}</option>)
                  }
                </select>
              </div>
              <div className='govuk-form-group'>
                <a href='#' id='inline-conditions-link' className='govuk-link' onClick={this.onClickDefineCondition}>Define a new condition</a>
              </div>
            </div>
          }
          {inline &&
            <InlineConditions data={this.props.data} path={this.props.path} conditionsChange={this.props.conditionsChange} cancelCallback={this.onCancelInlineCondition} hideAddLink={this.props.data.hasConditions} />
          }
        </div>
    )
  }
}

export default SelectConditions