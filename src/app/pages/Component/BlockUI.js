import React, {Component} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

class BlockUI  extends React.Component{
 render() {
   return (
    <div className="blockUI" style={{display: "block"}}> 
        <div className="processing">
                <span>Processing</span> <CircularProgress />
        </div>
    </div>
     );
   }
}

export default BlockUI;