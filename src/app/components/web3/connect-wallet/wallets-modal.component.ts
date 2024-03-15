import { DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { injectWallets } from '@heavy-duty/wallet-adapter';
import { HdWalletIconComponent } from '@heavy-duty/wallet-adapter-cdk';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';

@Component({
  selector: 'meompt-platform-wallets-modal',
  template: `
    <div
      class="w-full max-w-[450px] border-2 border-black bg-black/70 rounded-[30px] px-9 pb-12 pt-6"
    >
      <header class="p-16 pb-8 px-0 relative">
        <h2 class="text-xl text-center text-white">
          {{ message() }}
        </h2>
        <button
          class="absolute top-0 right-0 border-2 border-black flex justify-center items-center p-0"
          (click)="onClose()"
        >
          <span class="text-white"> X </span>
        </button>
      </header>

      @if (installedWallets().length > 0) {
      <ul class="flex flex-col justify-center items-center gap-y-2 w-full">
        @for (wallet of installedWallets(); track wallet.adapter.name) {
        <li class="w-full">
          <button
            (click)="onSelectWallet(wallet.adapter.name)"
            class="flex justify-between items-center gap-4 pl-3 pr-4 py-2 h-12 w-full text-white border border-white rounded-xl"
          >
            <div class="flex justify-start items-center gap-x-4">
              <hd-wallet-icon [hdWallet]="wallet"></hd-wallet-icon>
              <span class="text-base">{{ wallet.adapter.name }}</span>
            </div>
            <span class="text-xs">Detectada</span>
          </button>
        </li>
        }
      </ul>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HdWalletIconComponent],
})
export class MeomptPlatformWalletsModalComponent {
  private readonly _dialogRef = inject(DialogRef);
  private readonly _wallets = injectWallets();

  readonly installedWallets = computed(() =>
    this._wallets().filter(
      (wallet) => wallet.readyState === WalletReadyState.Installed
    )
  );
  readonly message = computed(() => {
    if (this.installedWallets().length > 0) {
      return 'Conecta una Wallet de Solana para continuar';
    } else {
      return `Necesitas una wallet en Solana para continuar`;
    }
  });

  onSelectWallet(walletName: WalletName): void {
    this._dialogRef.close(walletName);
  }

  onClose(): void {
    this._dialogRef.close();
  }
}
