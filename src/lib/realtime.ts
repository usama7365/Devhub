import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface RealtimeMessage {
  type: 'notification' | 'meeting_invite' | 'blog_comment';
  payload: any;
}

let channel: RealtimeChannel | null = null;

export function initializeRealtime(userId: string, onMessage: (message: RealtimeMessage) => void) {
  if (channel) {
    channel.unsubscribe();
  }

  channel = supabase.channel(`user:${userId}`)
    .on('broadcast', { event: 'message' }, ({ payload }) => {
      onMessage(payload as RealtimeMessage);
    })
    .subscribe();

  return () => {
    if (channel) {
      channel.unsubscribe();
      channel = null;
    }
  };
}