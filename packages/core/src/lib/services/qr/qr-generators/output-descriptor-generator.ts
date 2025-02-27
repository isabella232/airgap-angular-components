import { AccountShareResponse, IACMessageDefinitionObjectV3, MainProtocolSymbols } from '@airgap/coinlib-core'
import { IACQrGenerator } from '../../iac/qr-generator'

import { IACMessageType } from '@airgap/coinlib-core/serializer-v3/interfaces'

export class OutputDescriptorGenerator extends IACQrGenerator {
  private data: string | undefined

  constructor() {
    super()
  }

  public async create(data: IACMessageDefinitionObjectV3[], _multiFragmentLength: number, _singleFragmentLength: number): Promise<void> {
    if (!(await OutputDescriptorGenerator.canHandle(data))) {
      return
    }

    const element = data[0]

    if (element.type === IACMessageType.AccountShareResponse) {
      this.data = await this.generateOutputDescriptor(element)
    } else {
      throw new Error('Not Supported')
    }
  }

  public static async canHandle(data: IACMessageDefinitionObjectV3[]): Promise<boolean> {
    if (data.length === 1) {
      const element = data[0]
      return element.protocol === MainProtocolSymbols.BTC_SEGWIT && [IACMessageType.AccountShareResponse].includes(element.type)
    }

    return false
  }

  public async nextPart(): Promise<string> {
    return this.data ?? ''
  }

  public async getSingle(): Promise<string> {
    return this.data ?? ''
  }

  public async getNumberOfParts(): Promise<number> {
    return this.data ? 1 : 0
  }

  private async generateOutputDescriptor(data: IACMessageDefinitionObjectV3): Promise<string> {
    // EXAMPLE: DESC="wpkh([0f056943/84h/1h/0h]tpubDC7jGaaSE66Pn4dgtbAAstde4bCyhSUs4r3P8WhMVvPByvcRrzrwqSvpF9Ghx83Z1LfVugGRrSBko5UEKELCz9HoMv5qKmGq3fqnnbS5E9r/0/*)#erexmnep"

    const account = data.payload as AccountShareResponse

    const dpWithoutPrefix = account.derivationPath.slice(1)
    const dpWithoutUnhardened = dpWithoutPrefix.slice(0, dpWithoutPrefix.lastIndexOf("'") + 1)

    return `wpkh([${account.masterFingerprint}${dpWithoutUnhardened}]${account.publicKey}/0/*)`
  }
}
