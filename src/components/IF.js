import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useState, useEffect } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
import '../App.css'
const apipah = require('../apiPath')
const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    justifyContent: 'left',
    textAlign:'left',
    flexWrap: 'wrap',
    
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    height: 900,
    width: 600,
  },
  textField: {
    border: '1px white',
    color: 'red',
    cursor: 'pointer',
    onHover: 'pointer',
  }

}));
//For DropDown 
export default function RecursiveTreeViews() {
  const [parents, setParent] = useState('10');


  const classes = useStyles();

  const handleChange = (event) => {
    setParent(event.target.value);
  };
  return ( 
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <Select

            value={parents}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Childs</MenuItem>
            <MenuItem value={20}>Parent</MenuItem>
          </Select>
        </div>
        <div style={{ textAlign: "center" }}>

          {Trees(parents)}
        </div>
      </div>

    </>
  )
}

function Trees(parent) {
  const classes = useStyles();
  const [selecteds, setSelecteds] = useState([]);
  const [childnode,setChildnode]=useState([]);
  const [values, setValues] = useState('');
  const [clickme, setClickme] = useState(true)
  const [newLevel, setNewlevel] = useState('');
  const [spacing, setSpacing] = React.useState(2);
  const [data, setData] = useState('');
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const handleChange = (event) => {
    setValues(event.target.value);
  };
  const fortoplevel = (event) => {
    setNewlevel(event.target.value);
  };
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  const handleSelect = (event, nodeIds) => {
    console.log('fired', nodeIds)
    
    //only for top level
    if(selecteds !==nodeIds){
            console.log('fireddddd')
    }


    for (var i = 0; i < data.length; i++) {
      console.log(data[i])
      if (nodeIds == data[i]['_id']) {
        console.log('if cond passed',data[i])
        setSelecteds(data[i])
        setChildnode(data[i].children)
      }
    }
    setSelected(nodeIds);
  };
  useEffect(() => {
    async function fetchdata() {
      //http://localhost:4000
      const apidata = await axios.get(apipah.APIPATH+'chartofaccount')
      console.log(apidata.data)
      setData(apidata.data);
    }
    setClickme(true)
    fetchdata();
  }, [clickme]
  )
  const rendMyTreeNew = (node) => (
    node && node.map((n) => renderTree(n))
  )
  const renderTree = (nodes) => (
    <TreeItem key={nodes && nodes._id} nodeId={nodes && nodes._id} label={nodes && nodes.name}>
      {Array.isArray(nodes && nodes.children) ? nodes && nodes.children.map((n) => renderTree(n)) : null}
    </TreeItem>
  );
  //this is for child
  if (parent == '10') {
    return (
      <>
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
        <div>
          <Chip label={selected} avatar={<Avatar>Id</Avatar>} disabled />
          <Chip avatar={<Avatar>N</Avatar>} label={selecteds.name} disabled />
        </div>
        <TextField value={newLevel}
          onChange={fortoplevel}
          value={newLevel}
        />
        <Button
          onClick={
            ()=>{          
            setClickme(false)
            var children=[]
            children=childnode
            

            var subObj={
              _id:uuidv4(),
              name:newLevel,
              children:[],
            }
            
            children.push(subObj)


            if(parent == 10){
               
            }

              // const obj =
              // {

              //   id: 'root',
              //   name: newLevel,
              //   children: children,
              // }
              const obj=selecteds

              obj.children=children
              console.log('ok',obj)
              axios.post(apipah.APIPATH + 'chartofaccount/addAccountchild', obj)
                    .then(res => console.log(res.data));
              setNewlevel('')

            }

          }>
          clickMe</Button>

      </>
    );
  }
//this is for top level
  else {
    return (
      <>
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

            <div>
              <TextField value={newLevel}
                onChange={fortoplevel}
                value={newLevel}
              />
            </div>
            <Button
              variant="contained" onClick={
                () => {
                  setClickme(false)
                  const obj =
                  {

                    level:'levelone',
                    name: newLevel,
                    children: [

                    ],
                  }
                  console.log('ok')
                  axios.post(apipah.APIPATH + 'chartofaccount/addAccount', obj)
                                            
                    .then(res => console.log(res.data));
                  setNewlevel('')


                }

              }
            >
              Submit</Button>



          </>
    )
  }

}

