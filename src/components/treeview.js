import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useState, useEffect } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
  
  paper: {
    height: 140,
    width: 100,
  },
});

export default function Trees(parent) {
  const [spacing, setSpacing] = React.useState(2);
  const [data, setData] = useState('');
  useEffect(() => {
    async function fetchdata() {
      const apidata = await axios.get('http://localhost:4000/chartacApi/account')
      setData(apidata.data);
    }
    fetchdata();
  }, []
  )
  const classes = useStyles();
  const renderTree = (nodes) => (
    <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((n) => renderTree(n)) : null}
    </TreeItem>
  );
  const rendMyTreeNew = (node) => (
    node && node.map((n) => renderTree(n))
  )
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const handleToggle = (event,nodeId) => {
    setExpanded(event);
  };
  const handleSelect = (event, nodeId) => {
    setSelected(event);
  };
 return (
    <>
    <Grid container className={classes.root} spacing={2}>
    <Grid item xs={6}>
<Paper>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
    >
        {rendMyTreeNew(data)}
      </TreeView>
      </Paper>
</Grid>
<Grid item xs={6}>
<TextField value={selected}>
</TextField>
</Grid>
</Grid>
    </>
  );
}

