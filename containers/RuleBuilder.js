import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Textbox from '../components/Textbox'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'

class RuleBuilder extends Component {
    render() {

        const { rule, ruleTypes, ruleQualifiersForType, dispatch, actions } = this.props;

        return (
            <section>
                <Dropdown items={ruleTypes} selectedId={rule.ruleTypeId} handleSelectionChanged={ (ruleType) => actions.setRuleType(rule.id, ruleType.id) } />

                <Dropdown items={ruleQualifiersForType[rule.ruleTypeId]} selectedId={rule.ruleQualifierId} handleSelectionChanged={ (ruleQualifier) => actions.setRuleQualifier(rule.id, ruleQualifier.Id) } />

                <Textbox value={rule.ruleCriteria} handleChange={(ruleCriteria) => actions.setRuleQualifier(rule.id, ruleCriteria.Id) } />

                <Button text="Remove" handleClick={() => actions.removeRule(rule.id)} />

            </section>
        )
    }
}

RuleBuilder.propTypes = {
    rule: PropTypes.shape({
        ruleTypeId: PropTypes.string.isRequired,
        ruleQualifierId: PropTypes.string,
        ruleCriteria: PropTypes.any
    }).isRequired
};

function mapStateToProps(state) {
    return {
        ruleTypes: state.ruleTypes,
        ruleQualifiersForType: state.ruleQualifiersForType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SegmentBuilderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleBuilder);
