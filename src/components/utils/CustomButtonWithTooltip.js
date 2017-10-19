/*jshint esversion: 6*/
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function CustomButton({ children, onPress, style, disabled, tooltipText }) {
  const tooltip = (
    <Tooltip id="tooltip">{tooltipText}</Tooltip>
  );
  return (
    <OverlayTrigger placement="right" overlay={tooltip}>
      <Button className="Custom-Button" disabled={disabled} onClick={onPress}>{children}</Button>
    </OverlayTrigger>
  );
}
