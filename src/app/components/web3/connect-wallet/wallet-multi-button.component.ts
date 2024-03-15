import { Dialog } from '@angular/cdk/dialog';
// import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import {
  WalletStore,
  injectConnected,
  injectPublicKey,
  injectWallet,
} from '@heavy-duty/wallet-adapter';
import {
  HdConnectWalletDirective,
  HdDisconnectWalletDirective,
  HdWalletIconComponent,
} from '@heavy-duty/wallet-adapter-cdk';
import { WalletName } from '@solana/wallet-adapter-base';
import { EMPTY, concatMap } from 'rxjs';
import { MeomptPlatformWalletsModalComponent } from './wallets-modal.component';

@Component({
  selector: 'meompt-platform-wallet-multi-button',
  imports: [
    HdDisconnectWalletDirective,
    HdConnectWalletDirective,
    HdWalletIconComponent,
  ],
  template: `
    @if (connected()) {
    <button
      [disabled]="
        disconnectWallet.disconnecting() || !disconnectWallet.wallet()
      "
      (click)="disconnectWallet.run()"
      hdDisconnectWallet
      #disconnectWallet="hdDisconnectWallet"
      class="flex justify-between gap-2 items-center text-black text-center px-4 py-2 bg-transparent w-full rounded-xl border border-black disabled:cursor-not-allowed"
    >
      <div class="flex justify-start items-center gap-x-4">
        @if (wallet(); as wallet) {
        <hd-wallet-icon [hdWallet]="wallet"></hd-wallet-icon>
        }

        <span>
          {{
            publicKey()?.toBase58()?.slice(0, 4) +
              '...' +
              publicKey()?.toBase58()?.slice(-4)
          }}</span
        >
      </div>
      <span class="text-sm">
        {{ disconnectWallet.message() }}
      </span>
    </button>
    } @else if (wallet()) {
    <button
      [disabled]="
        connectWallet.connecting() ||
        !connectWallet.wallet() ||
        connectWallet.connected()
      "
      (click)="connectWallet.run()"
      hdConnectWallet
      #connectWallet="hdConnectWallet"
      class="flex justify-center text-left gap-2 items-center text-black px-4 py-2 bg-transparent w-full rounded-xl border border-black disabled:cursor-not-allowed"
    >
      @if (wallet(); as wallet) {
      <hd-wallet-icon [hdWallet]="wallet"></hd-wallet-icon>
      }

      <span class="text-black text-sm">Connect your self</span>
    </button>
    } @else {
    <button
      class="flex justify-center gap-2 items-center text-black text-center px-4 py-2 bg-transparent w-full rounded-xl border border-black disabled:cursor-not-allowed"
      (click)="onSelectWallet()"
    >
      Connect your self
    </button>
    }
  `,
  styles: `
  :host {
    width: 100%;
  }`,
  standalone: true,
})
export class MeomptPlatformWalletMultiButtonComponent {
  private readonly _dialog = inject(Dialog);
  private readonly _walletStore = inject(WalletStore);
  readonly wallet = injectWallet();
  readonly connected = injectConnected();
  readonly publicKey = injectPublicKey();

  onSelectWallet() {
    this._dialog
      .open<
        WalletName | undefined,
        unknown,
        MeomptPlatformWalletsModalComponent
      >(MeomptPlatformWalletsModalComponent, {})
      .closed.pipe(
        concatMap((walletName) => {
          if (!walletName) {
            return EMPTY;
          }

          this._walletStore.selectWallet(walletName);

          return this._walletStore.connect();
        })
      )
      .subscribe();
  }
}
