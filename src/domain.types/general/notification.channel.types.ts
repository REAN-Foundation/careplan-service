export enum NotificationChannel {
    Email        = 'Email',
    SMS          = 'SMS',
    WebPush      = 'WebPush',
    MobilePush   = 'MobilePush',
    Webhook      = 'Webhook',
    WhatsApp     = 'WhatsApp',
    Telegram     = 'Telegram',
    Slack        = 'Slack',
    WhatsappWati = 'WhatsappWati',
    WhatsappMeta = 'whatsappMeta'
}

export const NotificationChannelList: NotificationChannel[] = [
    NotificationChannel.Email,
    NotificationChannel.SMS,
    NotificationChannel.WebPush,
    NotificationChannel.MobilePush,
    NotificationChannel.Webhook,
    NotificationChannel.WhatsApp,
    NotificationChannel.Telegram,
    NotificationChannel.Slack,
    NotificationChannel.WhatsappWati,
    NotificationChannel.WhatsappMeta
];
