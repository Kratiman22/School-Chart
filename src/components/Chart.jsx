import Tree from "react-d3-tree";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../store/userSlice";
import { toast } from "react-toastify";
import { useRef } from "react";
import html2canvas from "html2canvas";

const renderNodeWithCustomElement = ({ nodeDatum, handleRemoveParent }) => (
    <g>
        <circle r="15" />
        <foreignObject x={-30} y={-25} width={60} height={30}>
            <button className="chart-tree-btn" onClick={() => handleRemoveParent(nodeDatum)}>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </foreignObject>
        <text fill="black" strokeWidth=".5" x="20">{nodeDatum.name}</text>
    </g>
);

export default function Chart() {
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const chartRef = useRef();

    const deleteMessage = (message) => {
        toast.info(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        })
    }

    const root = () => users.filter(u => !u.parent);

    const buildTree = (user) => {
        const children = users.filter(u => u.parent === user.input).map(child => buildTree(child));
        return {
            name: user.input + "(" + user.position + ")",
            id: user.id,
            parent: user.parent,
            input: user.input,
            children: children,
        };
    };

    const treeData = root().map(rootUser => buildTree(rootUser));

    const handleRemoveParent = (nodeDatum) => {
        const hasChild = users.find((u) => u.parent === nodeDatum.input);
        if (hasChild) {
            deleteMessage(<p>Cannot remove <b>{nodeDatum.input}</b>. Remove the child first!</p>);
            return;
        }
        dispatch(usersActions.removeParent(nodeDatum.id));
        deleteMessage(<p>Parent Removed successfully!</p>)
    }

    const handleExportPng = () => {
        html2canvas(chartRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const link = document.createElement('a');
            link.href = imgData;
            link.download = "hierarchy.png";
            link.click();
        });
    }

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <button className="text-white rounded hierarchyExportBtn" onClick={handleExportPng}>Export</button>
            <div ref={chartRef} style={{ height: '350px' }}>
                <Tree
                    data={treeData}
                    orientation="vertical"
                    pathFunc="diagonal"
                    nodeSize={{ x: 300, y: 200 }}
                    enableLegacyTransitions
                    depthFactor={120}
                    translate={{ x: 650, y: 50 }}
                    transitionDuration={1000} zoom=".9"
                    renderCustomNodeElement={(props) => renderNodeWithCustomElement({ ...props, handleRemoveParent })}
                />
            </div>
        </div>
    );
}
