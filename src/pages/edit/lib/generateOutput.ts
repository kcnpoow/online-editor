export const generateOutput = (html: string, css: string, js: string) => {
    const output = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    return output
};