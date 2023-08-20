import { Database as DB } from '@/lib/database.types';
import { WCToast, WCToastItem, WCToastIcon, WCToastContent, WCToastCloseButton } from 'wc-toast';


type Tweet = DB['public']['Tables']['tweets']['Row']
type Profile = DB['public']['Tables']['profiles']['Row']




declare global {
    type Database = DB;
    type TweetWithAuthor = Tweet & { author: Profile, likes: number, user_has_liked_tweet: boolean};
    // type definitions of wc-toast, required for type checking
    namespace JSX {
        interface IntrinsicElements {
          'wc-toast': React.DetailedHTMLProps<React.HTMLAttributes<WCToast>, WCToast>;
          'wc-toast-item': React.DetailedHTMLProps<React.HTMLAttributes<WCToastItem>, WCToastItem>;
          'wc-toast-icon': React.DetailedHTMLProps<React.HTMLAttributes<WCToastIcon>, WCToastIcon>;
          'wc-toast-content': React.DetailedHTMLProps<
            React.HTMLAttributes<WCToastContent>,
            WCToastContent
          >;
          'wc-toast-close-button': React.DetailedHTMLProps<
            React.HTMLAttributes<WCToastCloseButton>,
            WCToastCloseButton
          >;
        }
      }
}