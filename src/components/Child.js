import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Formik, useField } from "formik";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/FolderOpenTwoTone";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import MemoryIcon from "@material-ui/icons/Memory";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";

const initialValues = {};

const data = {
  id: "root",
  name: "Yellow Folder",
  type: "yellow",
  children: [
    {
      id: "pink-1",
      name: "Pink Folder",
      type: "pink",
      children: [
        {
          id: "red-pink-1-1",
          name: "Red Folder",
          type: "red",
          children: [
            {
              id: "file-red-1-1",
              name: "file-1",
              type: "file"
            },
            {
              id: "file-red-1-2",
              name: "file-2",
              type: "file"
            },
            {
              id: "file-red-1-3",
              name: "file-3",
              type: "file"
            }
          ]
        }
      ]
    },
    {
      id: "pink-2",
      name: "Pink Folder 2",
      type: "pink",
      children: [
        {
          id: "red-pink-2-1",
          name: "Red Folder 2",
          type: "red",
          children: [
            {
              id: "file-red-2-1",
              name: "file-2-1",
              type: "file"
            }
          ]
        }
      ]
    }
  ]
};

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400
  }
});

const RecursiveTreeView = () => {
  const classes = useStyles();
  const [yellow, setYellow] = useState("");
  const [pink, setPink] = useState("");
  const [red, setRed] = useState("");
  const [files, setFiles] = useState([]);

  const renderTree = (nodes, onSelect) =>
    nodes.type === "file" ? (
      <>
        <FormControlLabel
          control={
            <Checkbox
              name="file"
              onChange={e => onSelect(nodes.name, e.target.checked)}
            />
          }
          label={
            <>
              <MemoryIcon /> {nodes.name}
            </>
          }
          key={nodes.id}
        />
        <br />
      </>
    ) : (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <div>
            {nodes.type === "yellow" ? (
              <>
                <YellowCloseFolder /> {nodes.name}
              </>
            ) : nodes.type === "pink" ? (
              <>
                <PinkCloseFolder /> {nodes.name}
              </>
            ) : nodes.type === "red" ? (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="file"
                      onChange={e => {
                        onSelect(nodes.name, e.target.checked);
                      }}
                    />
                  }
                  label={
                    <>
                      <RedCloseFolder /> {nodes.name}
                    </>
                  }
                  key={nodes.id}
                />
              </>
            ) : null}
          </div>
        }
        onLabelClick={() => {
          onSelect(nodes.type, nodes.name);
          switch (nodes.type) {
            case "yellow":
              setYellow(nodes.name);
              break;
            case "pink":
              setPink(nodes.name);
              break;
            case "red":
              setRed(nodes.name);
              break;
            case "file":
              let newFiles = files;
              newFiles.push(nodes.name);
              setFiles(newFiles);
              break;
            default:
              break;
          }
        }}
        onIconClick={() => onSelect(nodes.type, nodes.name)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map(node => renderTree(node, onSelect))
          : null}
      </TreeItem>
    );

  initialValues["yellow"] = data.name;

  return (
    <Formik className={classes.root} initialValues={initialValues}>
      {props => (
        <>
          <Tree
            data={data}
            setFieldValue={props.setFieldValue}
            renderTree={renderTree}
          />
          <pre>{JSON.stringify(props.values, null, 2)}</pre>
        </>
      )}
    </Formik>
  );
};

export default RecursiveTreeView;

const Tree = props => {
  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {props.renderTree(props.data, props.setFieldValue)}
      </TreeView>
      <pre>{JSON.stringify(props.values, null, 2)}</pre>
    </>
  );
};

const YellowCloseFolder = () => {
  return <FolderIcon style={{ color: "#ffc800" }} />;
};
const PinkCloseFolder = () => {
  return <FolderIcon style={{ color: "#ff75ff" }} />;
};
const RedCloseFolder = () => {
  return <FolderIcon style={{ color: "#ff0000" }} />;
};
