import { PropTypes } from 'react'

export const RouterType = PropTypes.shape({
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
  staticContext: PropTypes.object
})
