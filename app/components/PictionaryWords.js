import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import ActionCached from 'material-ui/lib/svg-icons/action/cached'

const PictionaryWords = ({ onclick, word }) => (
	<div className="pictionary">
		<span className="pictionary__refresh">
			<IconButton touch={true} onClick={onclick} >
      	<ActionCached color={'#FAFAFA'} />
  		</IconButton>
		</span>
		<span className="pictionary__title">
			Generate word:
		</span>
		<span className="pictionary__words">
			{word}
		</span>
  </div>
);

PictionaryWords.propTypes = {
	onclick: React.PropTypes.func.isRequired,
	word: React.PropTypes.string.isRequired
}

export default PictionaryWords
