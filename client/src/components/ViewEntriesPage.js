import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchEntries} from '../redux/entryDataSlice.js';
import Entry from "./Entry";
import NavBtnDefault from "./NavBtnDefault";

export default function ViewEntriesPage() {
    const dispatch = useDispatch();
    const userID = useSelector(state => state.userData.userInfo.user_id);
    const entryDataGlobalState = useSelector(state => state.entryData);

    //Get all the user's entries when this component mounts.
    useEffect( () => {
        dispatch(fetchEntries(userID));
    }, []);

    // Insert an H3 if the data is still loading.
    let loadingState = null;
    if (entryDataGlobalState.status === 'pending') {
        loadingState = (<h3>Loading...</h3>);
    }
    // Insert an H3 if the data fetching has failed
    let failedState = null;
    if (entryDataGlobalState.status === 'failed') {
        loadingState = (<h3>Something went wrong.</h3>);
    }

    // This is displayed when the user has not added any entries yet.
    let noEntries = null;
    if (entryDataGlobalState.entryInfo.length === 0) {
        noEntries = (
            <React.Fragment>
            <h3>You have not added any entries yet...</h3>
            <NavBtnDefault link="/add-entry" btnText="Add new entry" />
            </React.Fragment>);
    }
    
    return (
        <div className="flex flex-col items-center justify-center my-16 ">
            <h1>View your entries</h1>
            <NavBtnDefault link="/dashboard" btnText="Go back to dashboard" />
            
            {loadingState}
            {failedState}
            {noEntries}
            <div className="rounded py-1 shadow-md bg-white">
                {entryDataGlobalState.entryInfo.map( (entry) =>
                <Entry key={entry.entry_id} entryInfo={entry}/>)}
            </div>
        </div>
    )
}

