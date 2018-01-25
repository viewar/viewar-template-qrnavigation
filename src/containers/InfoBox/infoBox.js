import React from 'react';
import styled from 'styled-components';

import { compose, renderNothing, branch, pure } from 'recompose';
import { connect } from 'react-redux';
import { removeInstance, setPropertyValues } from 'viewar-react/actions';

import { Label, SubLabel } from '../../components/Label';
import Button from '../../components/Button';
import Thumbnail from '../../components/Thumbnail';

const InfoBoxContainer =  styled.div`
  margin: 5px;
  background-color: rgba(255, 255, 255, 0.44);
  padding: 8px;
  width: 132px;
`;

const InfoBox = ({ selection, setPropertyValues, removeInstance }) =>
  <InfoBoxContainer>
    <Label>Name</Label>
    <div>{selection.name}</div>
    <Label>ID</Label>
    <div>{selection.id}</div>
    <Label>Materials</Label>
    { Object.entries(selection.materials).map(([label , materials]) =>
      <div key={label}>
        <SubLabel>{label}</SubLabel>
        { Object.values(materials).map(material =>
          <Thumbnail
            active={material.selected}
            onClick={() => setPropertyValues(selection.id, { [label]: material.key })}
            key={material.key}
            src={material.imageUrl}
          />,
        )}
      </div>,
    )}
    <Button onClick={() => removeInstance(selection.id)}>Remove</Button>
  </InfoBoxContainer>;


const hideIfNoData = hasNoData =>
  branch(
    hasNoData,
    renderNothing,
  )

export default compose(
  connect(
    ({ viewar_selection }) => ({ selection: viewar_selection.get('selection').toJS() }),
    dispatch => ({
      removeInstance: instanceId => dispatch(removeInstance({ instanceId })),
      setPropertyValues: (nodeId, propertyValues) => dispatch(setPropertyValues({ nodeId, propertyValues })),
    }),
  ),
  hideIfNoData(props => !props.selection.id),
  pure,
)(InfoBox);
