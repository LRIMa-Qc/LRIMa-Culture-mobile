import dayjs from 'dayjs'

export interface Log {
    timestamp: Date,
    message: string,
    // TODO: Integrate with the event type system
    eventType?: never,
}

export interface LogsListType {
    logs: Log[]
}

export const DATE_FORMAT = "MMM DD HH:mm:ss"

export function LogsList({ logs }: LogsListType) {
    return (
        <table className='ring-1 ring-slate-200 rounded-2xl overflow-hidden'>
            <tbody className='divide-y'>
                {logs.map(log => (
                    <tr key={log.timestamp.getTime()} className='[&>*]:p-3 divide-x'>
                        <td className='whitespace-nowrap bg-slate-50 text-slate-500'>{dayjs(log.timestamp).format(DATE_FORMAT)}</td>
                        <td className='w-full'>{log.message}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}