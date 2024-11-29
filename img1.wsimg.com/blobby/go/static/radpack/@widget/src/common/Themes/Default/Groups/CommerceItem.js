export function CommerceItem(props) {
  return this.Block(
    this.merge(
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }
      },
      props
    )
  );
}

export function CommerceItemHeading({ align, ...props }) {
  return this.Heading(
    this.merge(
      {
        typography: 'BodyAlpha',
        featured: true,
        style: {
          marginBottom: 'xsmall',
          textAlign: align
        }
      },
      props
    )
  );
}

export function CommerceItemIcon(props) {
  return this.Icon(
    this.merge(
      {
        style: {
          display: 'inline-block',
          marginRight: 'xxsmall',
          marginLeft: '-xxsmall'
        }
      },
      props
    )
  );
}

export function CommerceItemPrice(props) {
  return this.Price(
    this.merge(
      {
        typography: 'DetailsAlpha'
      },
      props
    )
  );
}

export function CommerceItemWrapper(props) {
  return this.Wrapper(
    this.merge(
      {
        style: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0'
        }
      },
      props
    )
  );
}

export function CommerceItemButton(props) {
  return this.Button(
    this.merge(
      {
        size: 'small'
      },
      props
    )
  );
}
