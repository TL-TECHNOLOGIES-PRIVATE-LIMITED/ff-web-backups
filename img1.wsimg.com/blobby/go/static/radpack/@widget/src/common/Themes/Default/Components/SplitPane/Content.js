export function SplitPaneContent({ style, roundedCorners, renderAsCard, ...props }) {
  const isNeutral = this.base.category === 'neutral';
  return this.merge(
    {
      tag: 'div',
      style: {
        backgroundColor: renderAsCard && isNeutral ? 'primaryLight' : 'section',
        borderRadius: roundedCorners ? 'xlarge' : 0,
        display: 'flex',
        alignItems: 'center',
        minHeight: '100%',
        padding: renderAsCard ? 'xlarge' : 0,
        ...style
      }
    },
    props
  );
}
