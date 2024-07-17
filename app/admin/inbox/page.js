import getInboxMessages from '@/actions/Admin/getInboxMessages'
import InboxTable from '@/components/Tables/Inbox'
import React from 'react'

export const metadata = {
    title: 'Admin - Inbox',
}

const Inbox = async() => {
    const inboxMessages = await getInboxMessages()
    return (
        <>
        <InboxTable inboxMessages={inboxMessages} />
        </>
    )
}

export default Inbox
