import React from 'react';
import { render } from '../../../tests/test-utils';
import Card from '../Card/Card';

const renderCard = () =>
  render(
    <Card
      visible
      region="SomeRegion"
      countryName="SomeCountry"
      capital="SomeCapital"
      flag="someflag.svg"
      population={123456789}
    />
  );

describe('Card', () => {
  describe('Renders with proper props', () => {
    it('Country name', () => {
      const { getByText } = renderCard();

      expect(getByText('SomeCountry')).toBeInTheDocument();
    });

    it('Image', () => {
      const { container } = renderCard();

      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'someflag.svg');
      expect(image).toHaveAttribute('alt', 'SomeCountry');
    });

    it('Region', () => {
      const { getByText } = renderCard();

      expect(getByText(/region:/i)).toBeInTheDocument();
      expect(getByText('SomeRegion')).toBeInTheDocument();
    });

    it('Capital', () => {
      const { getByText } = renderCard();

      expect(getByText(/capital:/i)).toBeInTheDocument();
      expect(getByText('SomeCapital')).toBeInTheDocument();
    });

    it('Population', () => {
      const { getByText } = renderCard();

      expect(getByText(/population:/i)).toBeInTheDocument();
      expect(getByText('123 456 789')).toBeInTheDocument();
    });
  });
});
