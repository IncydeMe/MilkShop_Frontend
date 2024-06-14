import * as React from 'react';
import { ClipLoader } from 'react-spinners';


interface ISpinnerProps {
    isLoading?: boolean;
}

const Spinner =  ({isLoading = true }: ISpinnerProps) => {
    return (
      <>
        <div id='loading-spinner'>
            <ClipLoader color={"#36D7B7"} loading={isLoading} size={150} aria-label='Loading Spinner' data-testid="loader"/>
        </div>
      </>
    );
}

export default Spinner;

