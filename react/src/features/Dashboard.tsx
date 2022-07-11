import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, Container } from '@mui/material';
import clsx from 'clsx';
import { inMeetingRef, onBreakRef, onCallRef, usersRef } from '../firebase';
import { update, onValue, set } from 'firebase/database';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'text',
    width: 110,
    cellClassName: (params: GridCellParams<string>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        onCall: params.value.toLowerCase() ==  "on call",
        onBreak: params.value.toLowerCase() ==  "on break",
        iNMeeting: params.value.toLowerCase() ==  "in meeting",
      });
    },
  },
  
];


const styles = {
  container: {
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    marginTop: '100px'
  },
  button: {
    marginRight: '20px'
  },

}
export default function Dashboard() {
  const [users, setUsers] = React.useState<any>([]);
  const [on_break_snapshot, set_on_break_snapshot] = React.useState<any>();
  const [in_meeting_snapshot, set_in_meeting_snapshot] = React.useState<any>();
  const [on_call_snapshot, set_on_call_snapshot] = React.useState<any>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(localStorage.getItem("access_token")) {
      api.getUsers().then((response) => {
        onValue(usersRef, (snapshot) => {
          const IN_MEETING_USERS = snapshot.val()["IN_MEETING"].split(",");
          const ON_BREAK_USERS = snapshot.val()["ON_BREAK"].split(",");
          const ON_CALL_USERS = snapshot.val()["ON_CALL"].split(",");
          var users_ = [...response.data];
          const finalUsers = users_.map((user) => {
            var status = "";
            if(IN_MEETING_USERS.includes(user.id.toString())) {
              status = "in meeting"
            } else if(ON_BREAK_USERS.includes(user.id.toString())) {
              status = "on break";
            } else if(ON_CALL_USERS.includes(user.id.toString())) {
              status = "on call";
            }
            return {
              ...user,
              status: status
            }
          });
          setUsers(finalUsers);
        });
      });

      onValue(onBreakRef,(snapshot) => {
        set_on_break_snapshot(snapshot);
      });

      onValue(inMeetingRef,(snapshot) => {
        set_in_meeting_snapshot(snapshot);
      });

      onValue(onCallRef,(snapshot) => {
        set_on_call_snapshot(snapshot);
      });
    } else {
      navigate("/login");
    }

  }, []);

  const onButtonClickHandler = (action: string) => {
    const userId = localStorage.getItem("access_token");
    var on_break_value = "";
    var on_call_value = "";
    var in_meeting_value = "";

    var on_call = on_call_snapshot.val().split(",");
    on_call = on_call.filter((v: any) => v != userId);
    
    var in_meeting = in_meeting_snapshot.val().split(",");
    in_meeting = in_meeting.filter((v: any) => v != userId);
    
    var on_break = on_break_snapshot.val().split(",");
    on_break = on_break.filter((v: any) => v != userId);
    
    if(action == "ON_BREAK") {
      on_break.push(userId);
    } else if(action == "ON_CALL") {
      on_call.push(userId);
    } else if(action == "IN_MEETING") {
      in_meeting.push(userId);
    }

    on_call_value = on_call.join(",");
    in_meeting_value = in_meeting.join(",");
    on_break_value = on_break.join(",");

    set(onCallRef, on_call_value);
    set(inMeetingRef, in_meeting_value);
    set(onBreakRef, on_break_value);
  }

  return (
    <Container sx={styles.container}>
      <Box sx={{ width: '50%', display: 'flex', marginBottom: '20px' }}>
        {on_break_snapshot && (<Button style={styles.button} onClick={() => onButtonClickHandler("ON_BREAK")} variant="contained" color='secondary'>ON BREAK</Button>)}
        {on_call_snapshot && (<Button style={styles.button} onClick={() => onButtonClickHandler("ON_CALL")} variant="contained" color='primary'>ON CALL</Button>)}
        {in_meeting_snapshot && (<Button style={styles.button} onClick={() => onButtonClickHandler("IN_MEETING")} variant="contained" color='error'>IN MEETING</Button>)}
      </Box> 
      <Box 
        sx={{ height: 400, width: "100%" }}
        justifyContent={{
         xs: "center"
        }}
      >
        <DataGrid
          sx={{ width: "80%"}}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>    
    </Container>
  );
}
