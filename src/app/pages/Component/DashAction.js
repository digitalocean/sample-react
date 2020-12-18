import React from "react";
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
    'Ban',
    'Report',
];
const ITEM_HEIGHT = 48;



export function DashAction() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }
    
    function handleClose() {
        setAnchorEl(null);
    }
    
    
    return (
        <>
		<IconButton
            aria-label="More"
            aria-controls="dash-action"
            aria-haspopup="true"
            onClick={handleClick}
            className="action-menu"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="dash-action"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 150,
              },
            }}
          >
            {options.map(option => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>  
    );
}
