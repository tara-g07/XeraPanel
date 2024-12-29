import { Button, Card, CardBody, CardHeader, Link, TableCell, TableRow } from "@nextui-org/react";
import { fetchApi } from "api";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PaginationComponent from "examples/pagination/pagination";
import TableC from "examples/Tables/Table";
import {handler} from "../../../../redux/loaderSlice";
import { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoEye } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const PublicMessages = ({  onReadClick , Notifications,loading, pages,setPages}) => {
  
  

// const [publicNotification,setPublicNotification]=useState({});
 
const[page,setPage]=useState(1);
useEffect(()=>{
  setPages({...pages,private:page})
  },[page,location])

  return (
    <div className="pt-6">
        <TableC tHeads={['Row','Title','Text','Date']} isLoading = {loading}>
        { Notifications?.data?.length &&
          Notifications?.data?.map((notif,index) => (
            <TableRow key={index}>
              <TableCell>{((page-1)*12)+index+1}</TableCell>
              <TableCell>{notif.title}</TableCell>
              <TableCell  style={{ maxWidth: '300px', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{notif.txt}</TableCell>
              <TableCell><div className="flex">{notif.time.from} {notif.time.to && `to`} {notif.time.to && <sapn className="flex flex-row-reverse w-fit mr-1">{notif.time.to}</sapn>}</div></TableCell>
            </TableRow>
          ))}
         
      </TableC>
      <PaginationComponent totalPages={Notifications.max_page} onPageChange={setPage} />
    </div>
  );
};

export default PublicMessages;
