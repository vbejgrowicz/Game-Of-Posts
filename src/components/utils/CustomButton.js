/*jshint esversion: 6*/
import React from 'react';
import { Button } from 'react-bootstrap';

export default function CustomButton({ children, onPress, style, disabled }) {
  return (
    <div style={style}>
      <Button className="Custom-Button" onClick={onPress}>{children}</Button>
    </div>
  );
}
