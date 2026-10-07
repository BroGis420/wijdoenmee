import React from 'react'
import type { JSX } from 'react/jsx-runtime'

import { useLocation } from 'react-router-dom'


    
// Component

        function SubmitInput({
            selector,
            id
        }: {
            selector: string;
            id: string;
        }) {
            return (
                <input
                    className={"js-hide button js-form-submit form-submit"}
                    data-drupal-selector={selector}
                    type={"submit"}
                    id={id}
                    value={"Toepassen"}
                >
                </input>
            )
        }
    

export default SubmitInput
