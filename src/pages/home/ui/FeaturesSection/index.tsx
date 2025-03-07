import { Feature } from './Feature';

export const FeaturesSection = () => {
  return (
    <section className='grid gap-12 py-12 md:grid-cols-2'>
      <Feature>
        <Feature.Icon>
          <img
            className='max-w-14'
            src='https://cpwebassets.codepen.io/assets/packs/icon-build-0f21c66ed03bfb36c597636d27ca621e.svg'
            alt='Icon of conveyer belt with boxes on it.'
          />
        </Feature.Icon>

        <Feature.Heading>Build & Test</Feature.Heading>

        <Feature.Description>
          Get work done quicker by building out <strong>entire projects</strong>{' '}
          or isolating code to <strong>test features and animations</strong>.
          Want to keep it all under wraps?{' '}
        </Feature.Description>
      </Feature>

      <Feature>
        <Feature.Icon>
          <img
            className='max-w-11'
            src='https://cpwebassets.codepen.io/assets/packs/icon-share-910c683bbac21bf41fcf9aab64ebc957.svg'
            alt='Icon of conveyer belt with boxes on it.'
          />
        </Feature.Icon>

        <Feature.Heading>Share Your Work</Feature.Heading>

        <Feature.Description>
          Become a part of the <strong>most active front-end community</strong>{' '}
          in the world by sharing work.
        </Feature.Description>
      </Feature>
    </section>
  );
};
