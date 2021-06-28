import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const res = await fetchWithToken('events',event, 'POST');
            const body = await res.json();

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                };
                dispatch(eventAddNew(event));
            } else {
                Swal.fire('Error', body.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', error, 'error');
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const res = await fetchWithToken(`events/${ event.id }`, event, 'PUT');
            const body = await res.json();

            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', error, 'error');
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { activeEvent } = getState().calendar;

        try {
            const res = await fetchWithToken(`events/${ activeEvent.id }`, {}, 'DELETE');
            const body = await res.json();

            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', error, 'error');
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const res = await fetchWithToken('events');
            const body = await res.json();

            if (body.ok) {
                const events = prepareEvents(body.events);
                dispatch(eventLoaded(events));
            } else {
                Swal.fire('Error', body.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', error, 'error');
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
})