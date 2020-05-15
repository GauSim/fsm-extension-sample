import { Injectable } from "@nestjs/common";


@Injectable()
export class DirectoryService {
  public resolveOauthEndpoint(cloudHost: string | undefined): string | undefined {
    if (!cloudHost) {
      return undefined
    }

    const hostList = ['qt.dev.coresuite.com', 'et.dev.coresuite.com'];

    const knownHost = hostList
      .find(it => it.toLowerCase() === cloudHost.toLowerCase());

    return knownHost
      ? `https://${knownHost}/api/oauth2/v1`
      : undefined
  }
}
